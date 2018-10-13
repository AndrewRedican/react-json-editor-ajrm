import React, { Component } from 'react';
import err                  from '../err';
import { format }           from '../locale';

class WarningBox extends Component{
    constructor(props){
        super(props);

        // Defining Component Requirements
        const requiredKeys = [
            'id',
            'hasError',
            'backgroundColor',
            'style',
            'locale',
            'error',
            'onClick'
        ];
        err.missingAnyKeys('this.props',this.props,requiredKeys);
        err.missingAnyKeys('this.props.style',this.props.style,['container','message']);
        err.isNotType('this.props.hasError',this.props.hasError,'boolean');
        err.isNotType('this.props.onClick',this.props.onClick,'function');
        err.isNotType('this.props.backgroundColor',this.props.backgroundColor,'string');

    }
    render(){
        const { id, hasError, backgroundColor, style, onClick, locale, error } = this.props;
        return(
            <div
                name  = 'warning-box'
                id    = {id}
                style = {{
                    display                  : 'block',
                    overflow                 : 'hidden',
                    height                   : hasError ? '60px' : '0px',
                    width                    : '100%',
                    margin                   : 0,
                    backgroundColor          : backgroundColor,
                    transitionDuration       : '0.2s',
                    transitionTimingFunction : 'cubic-bezier(0, 1, 0.5, 1)',
                    ...style.container
                }}
                onClick = {onClick}
            >
                <span
                    style = {{
                        display       : 'inline-block',
                        height        : '60px',
                        width         : '60px',
                        margin        : 0,
                        boxSizing     : 'border-box',
                        overflow      : 'hidden',
                        verticalAlign : 'top',
                        pointerEvents : 'none'
                    }}
                    onClick = {onClick}
                >
                    <div
                        style = {{
                            position      : 'relative',
                            top           : 0,
                            left          : 0,
                            height        : '60px',
                            width         : '60px',
                            margin        : 0,
                            pointerEvents : 'none'
                        }}
                        onClick = {onClick}
                    >
                        <div
                            style = {{
                                position      : 'absolute',
                                top           : '50%',
                                left          : '50%',
                                transform     : 'translate(-50%, -50%)',
                                pointerEvents : 'none'
                            }}
                            onClick = {onClick}
                        >
                            <svg
                                height  = '25px'
                                width   = '25px'
                                viewBox = '0 0 100 100'
                            >
                                <path 
                                    fillRule = 'evenodd'
                                    clipRule = 'evenodd'
                                    fill     = 'red'
                                    d        = 'M73.9,5.75c0.467-0.467,1.067-0.7,1.8-0.7c0.7,0,1.283,0.233,1.75,0.7l16.8,16.8  c0.467,0.5,0.7,1.084,0.7,1.75c0,0.733-0.233,1.334-0.7,1.801L70.35,50l23.9,23.95c0.5,0.467,0.75,1.066,0.75,1.8  c0,0.667-0.25,1.25-0.75,1.75l-16.8,16.75c-0.534,0.467-1.117,0.7-1.75,0.7s-1.233-0.233-1.8-0.7L50,70.351L26.1,94.25  c-0.567,0.467-1.167,0.7-1.8,0.7c-0.667,0-1.283-0.233-1.85-0.7L5.75,77.5C5.25,77,5,76.417,5,75.75c0-0.733,0.25-1.333,0.75-1.8  L29.65,50L5.75,26.101C5.25,25.667,5,25.066,5,24.3c0-0.666,0.25-1.25,0.75-1.75l16.8-16.8c0.467-0.467,1.05-0.7,1.75-0.7  c0.733,0,1.333,0.233,1.8,0.7L50,29.65L73.9,5.75z'
                                />
                            </svg>
                        </div>
                    </div>
                </span>
                <span
                    style = {{
                        display       : 'inline-block',
                        height        : '60px',
                        width         : 'calc(100% - 60px)',
                        margin        : 0,
                        overflow      : 'hidden',
                        verticalAlign : 'top',
                        position      : 'absolute',
                        pointerEvents : 'none'
                    }}
                    onClick = {onClick}  
                >
                    { 
                        error ?
                        <p
                            style = {{
                                color          : 'red',
                                fontSize       : '12px',
                                position       : 'absolute',
                                width          : 'calc(100% - 60px)',
                                height         : '60px',
                                boxSizing      : 'border-box',
                                margin         : 0,
                                padding        : 0,
                                paddingRight   : '10px',
                                overflowWrap   : 'break-word',
                                display        : 'flex',
                                flexDirection  : 'column',
                                justifyContent : 'center',
                                ...style.message
                            }}
                        >
                            {format(locale.format, error)}
                        </p>
                        : void(0)
                    }
                </span>
            </div>
        );
    }
}

export default WarningBox;