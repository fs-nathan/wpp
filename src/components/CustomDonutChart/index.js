import React from 'react';
import Chart from 'react-apexcharts';
import './style.scss';

export const ChartBox = ({ className = '', ...props }) => <div className={`comp_CustomDonutChart___chart-box ${className}`} {...props} />;

export const ChartDrawer = ({ className = '', ...props }) => <div className={`comp_CustomDonutChart___chart-drawer ${className}`} {...props} />;

export const ChartTitle = ({ className = '', ...props }) => <span className={`comp_CustomDonutChart___chart-title ${className}`} {...props} />;

export const ChartLegendBox = ({ className = '', ...props }) => <div className={`comp_CustomDonutChart___chart-legend-box ${className}`} {...props} />;

export const CustomChart = ({ className = '', ...props }) => <Chart className={`comp_CustomDonutChart___chart ${className}`} {...props} />;