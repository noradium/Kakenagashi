import React from 'react';

export default (props) => {
  return <span className="HeartIcon" onClick={props.onClick}>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
    >
      <g>
	      <path d="M473.984,74.248c-50.688-50.703-132.875-50.703-183.563,0c-17.563,17.547-29.031,38.891-34.438,61.391
		      c-5.375-22.5-16.844-43.844-34.406-61.391c-50.688-50.703-132.875-50.703-183.563,0c-50.688,50.688-50.688,132.875,0,183.547
		      l217.969,217.984l218-217.984C524.672,207.123,524.672,124.936,473.984,74.248z"/>
      </g>
    </svg>
  </span>;
}
