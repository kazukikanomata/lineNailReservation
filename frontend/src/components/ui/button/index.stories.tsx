import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from ".";

const meta: Meta<typeof Button> = {
  title: "components/ui/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "neutral",
        "accent",
        "info",
        "success",
        "warning",
        "error",
      ],
    },
    outline: { control: "boolean" },
    soft: { control: "boolean" },
    dash: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "primary",
    outline: true,
    children: "Outline Button",
  },
};

export const Soft: Story = {
  args: {
    variant: "primary",
    soft: true,
    children: "Soft Button",
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="accent">
        Accent
      </Button>
      <Button {...args} variant="neutral">
        Neutral
      </Button>
      <Button {...args} variant="info">
        Info
      </Button>
      <Button {...args} variant="success">
        Success
      </Button>
      <Button {...args} variant="warning">
        Warning
      </Button>
      <Button {...args} variant="error">
        Error
      </Button>
    </div>
  ),
};
