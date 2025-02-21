import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const PromMarkdown = ({ children }) => {
  return <Markdown remarkPlugins={[remarkGfm]}>{children}</Markdown>;
};

export default PromMarkdown;
