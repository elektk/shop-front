import { StyledTab, StyledTabs } from "@/styles/Tabs.styles";


export default function Tabs({ tabs, active, onChange }) {
  return (
    <StyledTabs>
      {tabs.map(tabName => (
        <StyledTab key={tabName}
          onClick={() => onChange(tabName)}
          active={tabName === active}
        >
          {tabName}
        </StyledTab>
      ))}
    </StyledTabs>
  );
}
