import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Toast } from ".";

const meta: Meta<typeof Toast> = {
  title: "components/ui/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    alert: {
      control: "select",
      options: ["info", "error"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Info: Story = {
  args: {
    message: "表示されました。",
    alert: "info",
  },
};

export const Error: Story = {
  args: {
    message: "失敗しました",
    alert: "error",
  },
};
