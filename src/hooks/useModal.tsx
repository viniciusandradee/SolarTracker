import { PropsWithChildren, useState } from "react";
import { View } from "react-native";
import {
  Portal,
  Dialog as PaperDialog,
  Button,
  IconButton,
} from "react-native-paper";

const useModal = (dismissable: boolean = true) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => setVisible(false);

  const Modal = ({ children }: PropsWithChildren) => (
    <View>
      <Portal>
        <PaperDialog
          visible={visible}
          onDismiss={hideModal}
          dismissable={dismissable}
        >
          <PaperDialog.Content style={{ minHeight: 500 }}>
            {children}
          </PaperDialog.Content>
        </PaperDialog>
      </Portal>
    </View>
  );

  return {
    showModal,
    hideModal,
    Modal,
  };
};

export { useModal };