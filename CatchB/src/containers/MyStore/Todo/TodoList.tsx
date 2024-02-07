import { List } from "react-native-paper";

export default function TodoList() {
  return (
    <List.AccordionGroup>
      <List.Accordion title="오픈 업무" id="1">
        <List.Item title="오픈 전에 해야 할 일" />
        <List.Item title="오픈 후에 해야 할 일" />
      </List.Accordion>
      <List.Accordion title="운영 업무" id="2">
        <List.Item title="오픈 전에 해야 할 일" />
        <List.Item title="오픈 후에 해야 할 일" />
      </List.Accordion>
    </List.AccordionGroup>
  );
}
