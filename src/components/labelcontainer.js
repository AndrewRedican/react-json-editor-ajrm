import React, { Component } from 'react';
import err                  from '../err';

class LabelContainer extends Component{
    constructor(props){
        super(props);

        // Defining Component Requirements
        const requiredKeys = [
            'id',
            'style',
            'onClick',
            'errorLine',
            'lines',
            'colors',
            'reference'
        ];
        err.missingAnyKeys('this.props',this.props,requiredKeys);
        err.missingAnyKeys('this.props.style',this.props.style,['container','labels']);
        this.renderLabels = this.renderLabels.bind(this);
    }
    renderLabels(){
        const { errorLine, lines, colors, style } = this.props;
        let
            labels    = new Array(lines);
        for(var i = 0; i < lines - 1; i++) labels[i] = i + 1;
        return labels.map( labelNumber => {
            const color = labelNumber !== errorLine ? colors.default : 'red';
            return (
                <div 
                    key   = {labelNumber}
                    style = {{
                        ...style.labels,
                        color : color
                    }}
                >
                    {labelNumber}
                </div>
            );
        });
    }
    render(){
        const { id, style, onClick, reference } = this.props;
        const { renderLabels } = this;
        return(
            <span
                name  = 'labels'
                id    = {id}
                ref   = {reference}
                style = {{
                    display       : 'inline-block',
                    boxSizing     : 'border-box',
                    verticalAlign : 'top',
                    height        : '100%',
                    width         : '44px',
                    margin        : 0,
                    padding       : '5px 0px 5px 10px',
                    overflow      : 'hidden',
                    color         : '#D4D4D4',
                    ...style.container
                }}
                onClick = {onClick}
            >
                {renderLabels()}
            </span>
        );
    }
}

export default LabelContainer;