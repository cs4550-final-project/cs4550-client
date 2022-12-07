import { Box } from "@mui/system";

export interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, ...other } = props;

  return (
    <div
      role="tabpanel"
      id={`vertical-tabpanel-${value}`}
      aria-labelledby={`vertical-tab-${value}`}
      style={{ width: "100%" }}
      {...other}
    >
      {<Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export default TabPanel;
