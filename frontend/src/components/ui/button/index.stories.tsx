import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from ".";

const meta: Meta<typeof Button> = {
  title: "components/ui/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "accent", "inset"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "responsive"],
    },
    outline: { control: "boolean" },
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

export const Inset: Story = {
  args: {
    variant: "inset",
    children: "Inset Button",
  },
};

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="accent">
        Accent
      </Button>
      <Button {...args} variant="inset">
        Inset
      </Button>
    </div>
  ),
};
