type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="max-w-screen-md mx-auto">{children}</div>;
};

export default Container;
