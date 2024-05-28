import React from 'react'

const Textarea = (props) => {
  return (
    <textarea placeholder={props.placeholder} id={props.id} rows={props.rows} cols={props.cols} onChange={props.onChange}></textarea>
  )
}

export default Textarea;