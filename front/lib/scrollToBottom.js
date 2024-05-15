const scrollToBottom = (chatBottomRef) => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'instant' })
};

export default scrollToBottom;