//import { View } from "react-native-reanimated/lib/typescript/Animated";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/Colors";

import UserImg from "../../assets/images/UserImg.svg";
import SettingsIcon from "../../assets/images/Settings.svg";
import { SearchInput } from "../SearchInput/SearchInput";
import { TextBase } from "../TextBase/TextBase";

interface TopBarProps {
  setSearchQuery: (str: string) => void;
}

export const TopBar = (props: TopBarProps) => {  
  const { setSearchQuery } = props;

  return (
    <View style={styles.container}>
      <View style={styles.topbarNameWrapper}>
        <View style={styles.nameWrapper}>
          <UserImg />
          <TextBase style={styles.name}>James Ronald</TextBase>
        </View>
        <SettingsIcon />
      </View>
      <SearchInput setSearchQuery={setSearchQuery} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  topbarNameWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  nameWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  name: {
    color: colors.nameColor,
    fontSize: 16,
    fontWeight: "700",
  },
});
