import {
	Card,
	CardHeader,
	CardBody,
	withFilters,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import {
	integrations,
	icons,
} from '../../../../form-settings/actions/constants';

const Integrations = withFilters( 'formello.settings.integrations' )( () => {
	return (
		<Card>
			<CardHeader>
				<h2>{ __( 'Integrations', 'formello' ) }</h2>
			</CardHeader>

			<CardBody>
				<p>
					{ __( 'Configure your integrations below.', 'formello' ) }
				</p>
			</CardBody>
		</Card>
	);
} );

const IntegrationsTab = () => {
	return (
		<Fragment>
			<Integrations integrations={ integrations } icons={ icons } />
		</Fragment>
	);
};

export default IntegrationsTab;
