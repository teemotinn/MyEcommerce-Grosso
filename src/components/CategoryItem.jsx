import React from 'react';
import { StyleSheet, Text } from 'react-native';

import Card from './Card';
import { useDispatch } from 'react-redux';
import { setCategorySelected } from '../features/shop/shopSlice';
import { capitalizeWords } from '../global/functions';

/**
 * CategoryItem component displays a category item.
 *
 * @param {object} props - Component props.
 * @param {string} props.item - The category item to display.
 * @param {object} props.navigation - Navigation object.
 * @returns {JSX.Element} - CategoryItem component.
 */
export default function CategoryItem({
    item,
    navigation
}) {

    const dispatch = useDispatch();
    
    const onSelectCategory = () => {
        dispatch(setCategorySelected(item));
        navigation.navigate('ItemListCategory');
    }

    return (
        <Card
            onPress={onSelectCategory}
            additionalStyle={styles.card}
        >
            <Text style={styles.textCategory}>
                {capitalizeWords(item)}
            </Text>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        maxWidthWidth: 320,
        width: '100%'
    },
    textCategory: {
        fontSize: 18,
        fontFamily: 'Nunito'
    },
});
