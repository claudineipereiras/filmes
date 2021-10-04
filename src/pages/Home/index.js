import React, {useState, useEffect }  from 'react';
import { AppRegistry, ScrollView } from 'react-native';

import { 
    Container, 
    SearchContainer,  
    Input, 
    SearchButton, 
    Title, 
    BannerButton, 
    Banner,
    SliderMovie
} from './styles';

import { Feather } from '@expo/vector-icons';

import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem'

import api, { key } from '../../services/api';

function Home(){
    const [nowMovies, setNowMovies] = useState([])

    useEffect(()=>{
        let isActive = true;

        async function getMovies(){
            const response = await api.get('/movie/now_playing', {
                params: {
                    api_key: key, 
                    language: 'pt-BR',
                    page: 1,
                }
            })
            console.log(response.data);

        }

        getMovies();

    }, [])
    return(
        <Container>
            <Header title="React Prime"/>

            <SearchContainer>
                <Input
                    placeholder="Ex Vingadores"
                    placeholderTextColor="#ddd"
                />
                <SearchButton>
                    <Feather name="search" size={30} color="#FFF" />
                </SearchButton>
            </SearchContainer>

            <ScrollView showVerticalScrollIndicator={false}>
                <Title>Em cartaz</Title>

                <BannerButton activeOpacity={0.5} onPress={ ()=> alert('TESTE')}>
                    <Banner
                    resizeMethod="resize"
                    source={{ uri: 'https://images.unsplash.com/photo-1519508234439-4f23643125c1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1498&q=80' }}
                    />
                </BannerButton>

                <SliderMovie
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={[1,2,3,4]}
                renderItem={ ({ item }) => <SliderItem /> }
                />
                
                <Title>Populares</Title>
                <SliderMovie
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={[1,2,3,4]}
                renderItem={ ({ item }) => <SliderItem /> }
                />
                
                <Title>Mais Votados</Title>
                <SliderMovie
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={[1,2,3,4]}
                renderItem={ ({ item }) => <SliderItem /> }
                />
                
                

            </ScrollView>

        </Container>
    )
}

export default Home;