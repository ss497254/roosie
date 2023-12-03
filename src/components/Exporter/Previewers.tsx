import { toBlob, toPng } from "html-to-image";
import NextImage from "next/image";
import { useRef } from "react";
import { useMobileScreen } from "src/hooks/useMobileScreen";
import { ChatMessage, useAppConfig, useChatStore } from "src/store";
import { showImageModal, showToast } from "src/ui";
import { copyToClipboard, downloadAs } from "src/utils";
import { Markdown } from "../Markdown";
import { ExportAvatar } from "./ExportAvatar";
import { PreviewActions } from "./PreviewActions";
import styles from "./exporter.module.scss";

import ChatGptIcon from "src/icons/chatgpt.png";

export function ImagePreviewer(props: {
  messages: ChatMessage[];
  topic: string;
}) {
  const chatStore = useChatStore();
  const session = chatStore.currentSession();
  const mask = session.mask;
  const config = useAppConfig();

  const previewRef = useRef<HTMLDivElement>(null);

  const copy = () => {
    showToast("Capturing Image...");
    const dom = previewRef.current;
    if (!dom) return;
    toBlob(dom).then((blob) => {
      if (!blob) return;
      try {
        navigator.clipboard
          .write([
            new ClipboardItem({
              "image/png": blob,
            }),
          ])
          .then(() => {
            showToast("Copied to clipboard");
            refreshPreview();
          });
      } catch (e) {
        console.error("[Copy Image] ", e);
        showToast("Copy failed, please grant permission to access clipboard");
      }
    });
  };

  const isMobile = useMobileScreen();

  const download = () => {
    showToast("Capturing Image...");
    const dom = previewRef.current;
    if (!dom) return;
    toPng(dom)
      .then((blob) => {
        if (!blob) return;

        if (isMobile) {
          showImageModal(blob);
        } else {
          const link = document.createElement("a");
          link.download = `${props.topic}.png`;
          link.href = blob;
          link.click();
          refreshPreview();
        }
      })
      .catch((e) => console.log("[Export Image] ", e));
  };

  const refreshPreview = () => {
    const dom = previewRef.current;
    if (dom) {
      dom.innerHTML = dom.innerHTML; // Refresh the content of the preview by resetting its HTML for fix a bug glitching
    }
  };

  return (
    <div className={styles["image-previewer"]}>
      <PreviewActions
        copy={copy}
        download={download}
        showCopy={!isMobile}
        messages={props.messages}
      />
      <div
        className={`${styles["preview-body"]} ${styles["default-theme"]}`}
        ref={previewRef}
      >
        <div className={styles["chat-info"]}>
          <div className={styles["logo"] + " no-dark"}>
            <NextImage
              src={ChatGptIcon.src}
              alt="logo"
              width={50}
              height={50}
            />
          </div>

          <div>
            <div className={styles["main-title"]}>Roosie</div>
            <div className={styles["sub-title"]}>Your all time partner.</div>
            <div className={styles["icons"]}>
              <ExportAvatar avatar={mask.avatar} />
              <span className={styles["icon-space"]}>&</span>
              <ExportAvatar avatar={mask.avatar} />
            </div>
          </div>
          <div>
            <div className={styles["chat-info-item"]}>
              Model: {mask.modelConfig.model}
            </div>
            <div className={styles["chat-info-item"]}>
              Messages: {props.messages.length}
            </div>
            <div className={styles["chat-info-item"]}>
              Topic: {session.topic}
            </div>
            <div className={styles["chat-info-item"]}>
              Time:
              {new Date(
                props.messages.at(-1)?.date ?? Date.now(),
              ).toLocaleString()}
            </div>
          </div>
        </div>
        {props.messages.map((m, i) => {
          return (
            <div
              className={styles["message"] + " " + styles["message-" + m.role]}
              key={i}
            >
              <div className={styles["avatar"]}>
                <ExportAvatar avatar={mask.avatar} />
              </div>

              <div className={styles["body"]}>
                <Markdown
                  content={m.content}
                  fontSize={config.fontSize}
                  defaultShow
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MarkdownPreviewer(props: {
  messages: ChatMessage[];
  topic: string;
}) {
  const mdText =
    `# ${props.topic}\n\n` +
    props.messages
      .map((m) => {
        return m.role === "user"
          ? `## Message From You:\n${m.content}`
          : `## Message From ChatGPT:\n${m.content.trim()}`;
      })
      .join("\n\n");

  const copy = () => {
    copyToClipboard(mdText);
  };
  const download = () => {
    downloadAs(mdText, `${props.topic}.md`);
  };
  return (
    <>
      <PreviewActions
        copy={copy}
        download={download}
        showCopy={true}
        messages={props.messages}
      />
      <div className="markdown-body">
        <pre className={styles["export-content"]}>{mdText}</pre>
      </div>
    </>
  );
}

// modified by BackTrackZ now it's looks better

export function JsonPreviewer(props: {
  messages: ChatMessage[];
  topic: string;
}) {
  const msgs = {
    messages: [
      {
        role: "system",
        content: `You are an assistant that ${props.topic}`,
      },
      ...props.messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ],
  };
  const mdText = "```json\n" + JSON.stringify(msgs, null, 2) + "\n```";
  const minifiedJson = JSON.stringify(msgs);

  const copy = () => {
    copyToClipboard(minifiedJson);
  };
  const download = () => {
    downloadAs(JSON.stringify(msgs), `${props.topic}.json`);
  };

  return (
    <>
      <PreviewActions
        copy={copy}
        download={download}
        showCopy={false}
        messages={props.messages}
      />
      <div className="markdown-body" onClick={copy}>
        <Markdown content={mdText} />
      </div>
    </>
  );
}
