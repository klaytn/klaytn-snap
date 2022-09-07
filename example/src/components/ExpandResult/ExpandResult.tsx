import React, { useState } from 'react'
import { CardHeader, CollapseProps, Collapse, Grid, CardContent, Typography } from '@material-ui/core/';
import { ExpandMore, SvgIconComponent } from '@material-ui/icons';

interface PropsType extends CollapseProps {
    title?: string;
    children: React.ReactNode;
    defaultExpand?: boolean;
    icon?: SvgIconComponent | null;
}
export const ExpandResult = (props: PropsType) => {
    const { title = "Result", children, defaultExpand, icon: Icon = ExpandMore, ...collapseProps } = props;
    const [expand, setCollapsed] = useState(defaultExpand);
    return (
        <>
            <CardHeader
                title={
                    <Grid container justifyContent="flex-start" alignItems="center" spacing={2} onClick={() => setCollapsed(!expand)}>
                        <Typography style={{ color: "#555555" }} variant="h6">{title}</Typography >
                        {Icon &&
                            <Icon fontSize="medium" color="inherit" style={{
                                transform: expand ? 'rotate(0deg)' : 'rotate( -90deg)',
                                transition: 'transform .5s',
                                color: "#555555"
                            }} />
                        }
                    </Grid>
                }
                style={{ cursor: 'pointer' }}
            />
            <Collapse in={expand} {...collapseProps}>
                <CardContent style={{ padding: '0 0 0 16px' }}>
                    {children}
                </CardContent>
            </Collapse>
        </ >
    );

}
export default ExpandResult