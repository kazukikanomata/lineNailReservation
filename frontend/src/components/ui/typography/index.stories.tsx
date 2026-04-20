import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Typography } from ".";

const meta: Meta<typeof Typography> = {
  title: "components/ui/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
    },
    align: {
      control: "select",
    },
    weight: {
      control: "select",
    },
    color: {
      control: "select",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: "これがデフォルトのテキスト",
    color: "base-content",
  },
};

export const Heading: Story = {
  render: (arges) => (
    <div className="flex flex-col gap4">
      <Typography {...arges} size="lg">
        h1: タイトル1
      </Typography>
      <Typography {...arges} size="base">
        h2: タイトル2
      </Typography>
      <Typography {...arges} size="sm">
        h3: タイトル3
      </Typography>
    </div>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Typography {...args} color="primary">
        Primary Color
      </Typography>
      <Typography {...args} color="secondary">
        Secondary Color
      </Typography>
      <Typography {...args} color="accent">
        Accent Color
      </Typography>
      <Typography {...args} color="base-content">
        Base Content Color
      </Typography>
    </div>
  ),
};

export const Weights: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Typography {...args} weight="light">
        Light Weight Text
      </Typography>
      <Typography {...args} weight="bold">
        Bold Weight Text
      </Typography>
    </div>
  ),
};
