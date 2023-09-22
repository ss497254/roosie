import { useEffect, useRef, useState } from "react";
import { SlotID } from "src/constant";
import { IconButton } from "src/ui/IconButtonWithText";
import { Avatar } from "./Avatar";
import styles from "./home.module.scss";
import Router from "next/router";
import { useCommand } from "src/command";
import { BUILTIN_MASK_STORE } from "src/masks";
import { useChatStore } from "src/store";
import { Mask, useMaskStore } from "src/store/mask";
import { MaskAvatar } from "./Mask/Mask";
import { SidebarOpenBtn } from "./SidebarOpenBtn";

import EyeIcon from "src/icons/eye.svg";
import LightningIcon from "src/icons/lightning.svg";

function MaskItem(props: { mask: Mask; onClick?: () => void }) {
  return (
    <div className={styles["mask"]} onClick={props.onClick}>
      <MaskAvatar mask={props.mask} />
      <div className={styles["mask-name"] + " one-line"}>{props.mask.name}</div>
    </div>
  );
}

function useMaskGroup(masks: Mask[]) {
  const [groups, setGroups] = useState<Mask[][]>([]);

  useEffect(() => {
    const computeGroup = () => {
      const appBody = document.getElementById(SlotID.AppBody);
      if (!appBody || masks.length === 0) return;

      const rect = appBody.getBoundingClientRect();
      const maxWidth = rect.width;
      const maxHeight = rect.height * 0.6;
      const maskItemWidth = 120;
      const maskItemHeight = 50;

      const randomMask = () => masks[Math.floor(Math.random() * masks.length)];
      let maskIndex = 0;
      const nextMask = () => masks[maskIndex++ % masks.length];

      const rows = Math.ceil(maxHeight / maskItemHeight);
      const cols = Math.ceil(maxWidth / maskItemWidth);

      const newGroups = new Array(rows)
        .fill(0)
        .map((_, _i) =>
          new Array(cols)
            .fill(0)
            .map((_, j) => (j < 1 || j > cols - 2 ? randomMask() : nextMask())),
        );

      setGroups(newGroups);
    };

    computeGroup();

    window.addEventListener("resize", computeGroup);
    return () => window.removeEventListener("resize", computeGroup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return groups;
}

export default function NewChat() {
  const chatStore = useChatStore();
  const maskStore = useMaskStore();

  const masks = maskStore.getAll();
  const groups = useMaskGroup(masks);

  const maskRef = useRef<HTMLDivElement>(null);

  const startChat = (mask?: Mask) => {
    setTimeout(() => {
      const { id } = chatStore.newSession(mask);
      Router.push(`/m/${id}`);
    }, 10);
  };

  useCommand({
    mask: (id) => {
      try {
        const mask = maskStore.get(id) ?? BUILTIN_MASK_STORE.get(id);
        startChat(mask ?? undefined);
      } catch {
        console.error("[New Chat] failed to create chat from mask id=", id);
      }
    },
  });

  useEffect(() => {
    if (maskRef.current) {
      maskRef.current.scrollLeft =
        (maskRef.current.scrollWidth - maskRef.current.clientWidth) / 2;
    }
  }, [groups]);

  return (
    <div className={styles["new-chat"]}>
      <div className={styles["mask-header"]}>
        <SidebarOpenBtn />
      </div>
      <div className={styles["mask-cards"]}>
        <div className={styles["mask-card"]}>
          <Avatar size={24} />
        </div>
        <div className={styles["mask-card"]}>
          <Avatar size={24} />
        </div>
        <div className={styles["mask-card"]}>
          <Avatar size={24} />
        </div>
      </div>

      <div className={styles["title"]}>Pick a Mask</div>
      <div className={styles["sub-title"]}>
        Mask is a preconfigured reusable template.
      </div>
      <div className={styles["actions"]}>
        <IconButton
          text="Find more"
          onClick={() => Router.push("/c")}
          icon={<EyeIcon />}
          bordered
          shadow
        />

        <IconButton
          text="Just Start"
          onClick={() => startChat()}
          icon={<LightningIcon />}
          type="primary"
          shadow
          className={styles["skip"]}
        />
      </div>

      <div className={styles["masks"]} ref={maskRef}>
        {groups.map((masks, i) => (
          <div key={i} className={styles["mask-row"]}>
            {masks.map((mask, index) => (
              <MaskItem
                key={index}
                mask={mask}
                onClick={() => startChat(mask)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
