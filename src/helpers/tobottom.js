export const toBottom = () => {
  let container = document.querySelector(".chat-container");
  container.scrollTo({
    left: 0,
    top: container.scrollHeight - container.clientHeight,
    behavior: "smooth",
  });
};
