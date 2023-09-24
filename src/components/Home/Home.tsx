import Router from "next/router";
import { useEffect, useRef } from "react";
import { useCommand } from "src/command";
import { BUILTIN_MASK_STORE } from "src/masks";
import { useChatStore } from "src/store";
import { Mask, useMaskStore } from "src/store/mask";
import { IconButton } from "src/ui/IconButtonWithText";
import { Avatar } from "../Avatar";
import { SidebarOpenBtn } from "../SidebarOpenBtn";
import { MaskItem } from "./MaskItem";
import styles from "./home.module.scss";
import { useMaskGroup } from "./useMaskGroup";

import EyeIcon from "src/icons/eye.svg";
import LightningIcon from "src/icons/lightning.svg";

export default function Home() {
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
