const ComPreview = function({ entry, widgetFor }) {
  const template = function(html, val) {
    try {
      // eslint-disable-next-line
      return (new Function('data', 'return `' + html + '`'))(val)
    } catch (err) {
      console.error(err);
    }
  }
  let defaultData = entry.getIn(['data', 'defaultData'])
  try{
    defaultData = defaultData ? JSON.parse(defaultData) : {}
  }catch(err){console.error(err)}
  const tpl = template(entry.getIn(['data', 'tpl']) || '', defaultData)
  return (
    <div className="component-section" dangerouslySetInnerHTML={{ __html: tpl}}></div>
  )
};

export default ComPreview;