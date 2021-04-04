import { IconButton } from "@chakra-ui/react"
import Icon from "@chakra-ui/icon"
import { Box, Divider, Flex, Heading, Spacer, Stack, StackDivider, Text } from "@chakra-ui/layout"
import { Check, ChevronLeft } from "react-feather"
import { IconComponent } from "../display/components/Icon"
import { SearchComponentWrapper } from "../display/components/Search"
import { IconName } from "display-api"

export const SearchSubFilters: React.FC<{ searchType: String }> = ({ searchType }) => {

    const renderItem = (text: string, isSelected: boolean = false, iconName?: IconName, isLast?: boolean) => {
        return (
            <Box
                cursor='pointer'
                px={4}
                pt={7.5}
                borderBottomRadius={isLast && global ? 20 : undefined}
                pb={isLast && global ? 6 : 9.5}
                onClick={() => {
                }}>
                <Flex alignItems='center'>
                    {iconName && <IconComponent name={iconName} />}
                    <Text>{text}</Text>
                    <Spacer />
                    {isSelected && <Icon ml='2' color='#111111' as={Check} />}
                </Flex>
            </Box>
        )
    }

    const renderSearchType = () => {
        if (searchType == 'Sort By') {
            return (
                <Stack maxH='80vh' overflow='scroll' spacing={0} divider={<StackDivider borderColor='gray.200' />}>
                    {renderItem('Default', true)}
                    {renderItem('Star count')}
                    {renderItem('Last updated')}
                    {renderItem('Last updated')}

                </Stack>
            )
        }
        if (searchType == 'Owner') {

            return (
                <SearchComponentWrapper
                    component={{ cid: "search", type: "User" }}
                    onChoose={(result) => {
                        console.log(result)
                    }}
                >
                </SearchComponentWrapper>
            )

        }
        if (searchType == 'Block Type') {
            return (
                <Stack maxH='80vh' overflow='scroll' spacing={0} divider={<StackDivider borderColor='gray.200' />}>
                    {renderItem('Task', true, 'TaskComplete')}
                    {renderItem('Habit', false, 'Type')}
                    {renderItem('Chat', false, 'Message')}
                    {renderItem('Group', false, 'Folder')}
                    {renderItem('Text', false, 'Feed')}
                </Stack>
            )
        }
    }
    return (
        <Box shadow='lg' width={400} bg='white' borderTopRadius={40} borderBottomRadius={20} pt={1} display='block'>
            <Box
                borderTopRadius={20}
                px={5}
                pb={global ? 6 : 9.5}
                pt={7.5}>
                <Flex>
                    <IconButton aria-label="back" variant='link' colorScheme='blue' icon={<Icon as={ChevronLeft} />} />
                    <Spacer />
                    <Heading size='sm'>{searchType}</Heading>
                    <Spacer />
                </Flex>
            </Box>
            <Divider borderColor='gray.500' />
            {renderSearchType}
        </Box >
    )
}
