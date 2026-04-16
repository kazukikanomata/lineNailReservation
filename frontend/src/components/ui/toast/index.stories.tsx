import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Toast } from ".";

const meta: Meta<typeof Toast> = {
  title: "components/ui/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    message: { control: "text" },
    status: {
      control: "select",
      options: ["info", "success", "error", "warning"],
    },
    vertical: {
      control: "select",
      options: ["top", "start", "center", "end"],
    },
    horizontal: {
      control: "select",
      options: ["start", "middle", "center", "end"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Info: Story = {
  args: {
    message: "表示されました。",
    status: "info",
    vertical: "top",
    horizontal: "start",
  },
};

export const Success: Story = {
  args: {
    message: "成功しました",
    status: "success",
    vertical: "top",
    horizontal: "center",
  },
};

export const Error: Story = {
  args: {
    message: "失敗しました",
    status: "error",
    vertical: "top",
    horizontal: "center",
  },
};

export const Warning: Story = {
  args: {
    message: "警告が発生しました",
    status: "warning",
    vertical: "top",
    horizontal: "center",
  },
};
