interface ContentWrapProperties {
  children: React.ReactNode;
}

const ContentWrap = (props: ContentWrapProperties) => {
  return (
    <div
      className="w-[60%] 2xl:w-[70%] bg-zinc-800 fixed right-0 top-0
                    h-screen flex flex-col items-center"
    >
      {props.children}
    </div>
  );
};
export default ContentWrap;
