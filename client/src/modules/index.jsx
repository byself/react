import React from 'react';
import { render } from 'react-dom';

export default class Registry extends React.Component {
    constructor(props) {
        super(props);
	}

	render() {
		return (
			<div className="container">
				hello world
			</div>
		)
	}
}

function init() {

    render(<Registry />, document.querySelector('#app'));

}

window.addEventListener('pageshow', function() {
    init();
});
