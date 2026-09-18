import { Modal as AntModal } from "antd";
import type { ModalProps, ModalFuncProps } from "antd";

export const Modal = ({
  centered = true,
  destroyOnHidden = true,
  maskClosable = false,
  okText = "Confirm",
  cancelText = "Cancel",
  ...props
}: ModalProps) => {
  return (
    <AntModal
      centered={centered}
      destroyOnHidden={destroyOnHidden}
      maskClosable={maskClosable}
      okText={okText}
      cancelText={cancelText}
      {...props}
    />
  );
};

const baseFuncProps: Partial<ModalFuncProps> = {
  centered: true,
  okText: "Confirm",
  cancelText: "Cancel",
};

export const confirm = (props: ModalFuncProps) =>
  AntModal.confirm({ ...baseFuncProps, ...props });

export const info = (props: ModalFuncProps) =>
  AntModal.info({ centered: true, ...props });

export const success = (props: ModalFuncProps) =>
  AntModal.success({ centered: true, ...props });

export const warning = (props: ModalFuncProps) =>
  AntModal.warning({ centered: true, ...props });

export const error = (props: ModalFuncProps) =>
  AntModal.error({ centered: true, ...props });

export type { ModalProps, ModalFuncProps } from "antd";
