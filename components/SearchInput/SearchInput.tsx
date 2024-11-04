import { StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../constants/Colors";
import SearchIcon from '../../assets/images/SearchIcon.svg';

interface SearchInputProps {
  setSearchQuery: (str: string) => void;
}

export const SearchInput = (props: SearchInputProps) => {
  const { setSearchQuery } = props;

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for notes"
        style={styles.input}
        onChangeText={handleSearch}
      />
      <SearchIcon style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.searchBarWhite,
    marginTop: 20,
    borderRadius: 6,
  },

  input: {
    padding: 12,
  },

  icon: {
    marginRight: 12,
  },
});
