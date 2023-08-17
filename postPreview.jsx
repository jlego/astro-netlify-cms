
const PostPreview = function({ entry, widgetFor }) {
  return (
    <div className="post-content">{widgetFor('body')}</div>
  );
};

export default PostPreview;