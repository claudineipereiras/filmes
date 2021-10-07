import React, {useState, useEffect }  from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';

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
import { getListMovies, randomBanner } from '../../utils/movie';

function Home(){
    const [nowMovies, setNowMovies] = useState([]);
    const [populatMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [bannerMovie, setBannerMovie] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        let isActive = true;
        const ac = new AbortController();

        async function getMovies(){
          const [nowData, popularData, topData] = await Promise.all([
              api.get('/movie/now_playing',{
                 params:{
                     api_key: key,
                     language: 'pt-BR',
                     page: 1,
                 } 
              }),
              
              api.get('/movie/popular',{
                 params:{
                     api_key: key,
                     language: 'pt-BR',
                     page: 1,
                 } 
              }),

              api.get('/movie/top_rated',{
                 params:{
                     api_key: key,
                     language: 'pt-BR',
                     page: 1,
                 } 
              }),
          ])
          if(isActive){
            const nowList = getListMovies(10, nowData.data.results);
            const popularList = getListMovies (5, popularData.data.results);
            const topList = getListMovies (5, topData.data.results);

            setBannerMovie(nowData.data.results)
            //console.log(randomBanner(nowData.data.results))
            
            setNowMovies(nowList)
            setPopularMovies(popularList)
            setTopMovies(topList)
            setLoading(false);
          }            
        }

        getMovies();

        return() => {
            isActive = false;
            ac.abort();
        }

    }, [])

    if(loading){
        return(
            <Container>
                <ActivityIndicator size="large" color="#FFF" />
            </Container>
        )
    }
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
                data={nowMovies}
                renderItem={ ({ item }) => <SliderItem data={item}/> }
                keyExtractor={ (item) => String(item.id) }
                />
                
                <Title>Populares</Title>
                <SliderMovie
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={populatMovies}
                renderItem={ ({ item }) => <SliderItem data={item}/> }
                keyExtractor={ (item) => String(item.id) }
                />
                
                <Title>Mais avaliados</Title>
                <SliderMovie
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={topMovies}
                renderItem={ ({ item }) => <SliderItem data={item}/> }
                keyExtractor={ (item) => String(item.id) }
                />
                
                

            </ScrollView>

        </Container>
    )
}

export default Home;