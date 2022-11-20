type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="mx-auto max-w-screen-md">{children}</div>;
};

export default Container;
