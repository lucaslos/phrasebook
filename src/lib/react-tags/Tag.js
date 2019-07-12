/* eslint-disable */

import React from 'react'

export default (props) => (
  <button type='button' className={props.classNames.selectedTag}>
    <span className={props.classNames.selectedTagName}>{props.tag.name}</span><span className="react-tags__delete-button" onClick={props.onDelete} title={props.removeButtonText}>&#10005;</span>
  </button>
)
