import * as React from 'react';
import Select, { ReactSelectProps } from 'react-select';

class InlineSelect extends React.PureComponent<ReactSelectProps> {
	public render() {
		return (
			<div style={{ display: 'inline-block' }}>
				<Select {...this.props} />
			</div>
		);
	}
}
export default InlineSelect;
