import { View, Text } from "react-native";
import * as DropdownMenu from 'zeego/dropdown-menu'
import { Ionicons } from '@react-native-vector-icons/ionicons';

export type Props = {
    items: Array<{
        key: string;
        title: string;
        icon: string;
        iconAndroid?: string;
    }>;
    onSelect: (key:string) => void;
};

export default function DropDownMenu({items, onSelect}: Props) {
    return (
        <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Ionicons name="ellipsis-vertical" size={24} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>my label</DropdownMenu.Label>
        
        <DropdownMenu.Item key="1">
          <DropdownMenu.ItemTitle>my Item</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>

         {/* <DropdownMenu.Label />
        <DropdownMenu.Group>
          <DropdownMenu.Item />
        </DropdownMenu.Group>
        <DropdownMenu.CheckboxItem>
          <DropdownMenu.ItemIndicator />
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger />
          <DropdownMenu.SubContent />
        </DropdownMenu.Sub>
        <DropdownMenu.Separator />
        <DropdownMenu.Arrow /> */}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
    )
}