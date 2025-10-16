import { useBlockProps, RichText } from '@wordpress/block-editor';

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

const deprecated = [ v1 ];

export default deprecated;

