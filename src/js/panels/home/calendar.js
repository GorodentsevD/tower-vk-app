import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {closePopout, goBack, openModal, openPopout} from "../../store/router/actions";
import {Alert, Panel, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";

import moment from "moment";
import Calendar from "../../../react-calendar/src";

class CalendarView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        };
    }

    onChange = date => this.setState({date});

    onClickDay = value => {
        this.props.openPopout(
            <Alert
                actions={[{
                    title: 'Ok',
                    autoclose: true,
                    style: 'cancel',
                }]}
                onClose={() => this.props.closePopout()}
            >
                <h2>Выбранный день:</h2>
                <p>{moment(value).format('YYYY-MM-DD')}</p>
            </Alert>
        );
    };

    render() {
        const {id, goBack} = this.props;
        return (
            <Panel id={id}>
                <PanelHeader
                    left={<PanelHeaderBack onClick={() => goBack()}/>}
                >
                    Календарь
                </PanelHeader>
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                    onClickDay={this.onClickDay}
                />
            </Panel>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({goBack, openPopout, closePopout, openModal}, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        accessToken: state.vkui.accessToken
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView);
