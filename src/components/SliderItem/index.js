import React from 'react';
import {View, Text} from 'react-native';

import {
    Container,
    BannerItem,
    Title,
    RateContainer,
    Rate
 } from './styles'

function SliderItem(){
    return(
        <Container>
            <BannerItem
              source={{ uri: 'https://images.unsplash.com/photo-1519508234439-4f23643125c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1498&q=80'}}
              />
            <Title>vingadores</Title>
            <RateContainer>
                <Ionicons name="md-star" size={12} color="E7A74e" />
                <Rate>9/10</Rate>

            </RateContainer>

            <Text>ITEM</Text>
        </Container>
    )
}

export default SliderItem;