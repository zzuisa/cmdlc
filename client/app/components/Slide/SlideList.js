import React from 'react';
import PropTypes from 'prop-types';
import {
    Button, Step, Card, Radio,
} from 'antd';

function SlideList(props) {
    return (
        <Card>
            <Radio.Group defaultValue="a" buttonStyle="solid">
                {
                    props.slides.map((s, index) => (
                        <Radio.Button style={{ float: 'left' }} value={ s.name} key={index}>{ s.name}</Radio.Button>
                    ))
                }
            </Radio.Group>

        </Card>

    );
}

SlideList.propTypes = {
    slides: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        des: PropTypes.string.isRequired,
        create_time: PropTypes.string.isRequired,
        update_time: PropTypes.string.isRequired,
    })).isRequired,
    handleDeletePost: PropTypes.func.isRequired,
};

export default SlideList;
