import React from 'react'

const PagePreview = function({ entry, widgetsFor, widgetFor }) {
  const template = function(html, val) {
    try {
      // eslint-disable-next-line
      return (new Function('data', 'return `' + html + '`'))(val)
    } catch (err) {
      console.error(err);
    }
  }
  function arrayToObj(arr, keyName, valName) {
    if(Array.isArray(arr)){
      let res = {}
      for(let item of arr){
        if(typeof item === 'object' && item[keyName] && item[valName]){
          res[item[keyName]] = item[valName]
        }
      }
      return res
    }else{
      return {}
    }
  }
  return (
    entry.getIn(['data', 'components']).map((item, index) => {
      const arr = item.getIn(['tpl']) ? item.getIn(['tpl']).split('*#####*') : ['','','{}']
      let attrs = {}
      try{
        attrs = item.getIn(['attrs']) ? arrayToObj(JSON.parse(JSON.stringify(item.getIn(['attrs']))), 'type', 'value') : {}
        attrs = JSON.stringify(attrs) !== '{}' ? attrs : (arr[1] ? JSON.parse(arr[1]) : {})
      }catch(err){console.error(err)}
      const tpl = template(arr[0], attrs)
      return (
        <div className="page-section" key={index} dangerouslySetInnerHTML={{ __html: tpl}}></div>
      )
    })
  );
};

export default PagePreview;