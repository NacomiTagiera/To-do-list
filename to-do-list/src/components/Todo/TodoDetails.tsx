interface Props {
  category: string;
  completed: boolean;
  deadline: Date;
  description: string;
  title: string;
}

export default function TodoDetails({
  category,
  completed,
  deadline,
  description,
  title,
}: Props) {
  return <div>TodoDetails</div>;
}
