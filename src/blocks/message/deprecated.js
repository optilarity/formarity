import { useBlockProps, RichText } from '@wordpress/block-editor';

// v2 - without className in blockProps and empty context
const v2 = {
	attributes: {
		text: {
			type: 'string'
		},
		messageType: {
			type: 'string',
			default: 'success'
		},
		displayType: {
			type: 'string',
			default: 'notice'
		}
	},
	save( { attributes } ) {
		const blockProps = useBlockProps.save();
		return (
			<div
				{ ...blockProps }
				data-wp-class--success="context.response.success"
				data-wp-class--error="!context.response.success"
				data-wp-interactive="formello"
				data-wp-context={ JSON.stringify( {} ) }
			>
				<p data-wp-text="state.message"></p>
				<ul data-wp-context="state.errors">
					<template data-wp-each="state.errors">
						<li data-wp-text="context.item"></li>
					</template>
				</ul>
			</div>
		);
	},
};

// v1 - with data-wp-bind--hidden attributes
const v1 = {
	save( { attributes } ) {
		const blockProps = useBlockProps.save();
		return (
			<div
				{ ...blockProps }
				data-wp-class--success="context.response.success"
				data-wp-class--error="!context.response.success"
				data-wp-interactive="formello"
				data-wp-bind--hidden="!context.response"
			>
				<p data-wp-bind--hidden="!context.response.success"></p>
				<p
					data-wp-text="state.message"
					data-wp-bind--hidden="context.response.success"
				></p>
				<ul data-wp-context="state.errors">
					<template data-wp-each="state.errors">
						<li data-wp-text="context.item"></li>
					</template>
				</ul>
			</div>
		);
	},
};

const deprecated = [ v2, v1 ];

export default deprecated;

