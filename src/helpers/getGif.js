export const getGif = async (title) => {

    const apiKey = 'meCjGqYZr7BkxTnHrwXNclG8KAonKXel';
    const name = title;
    const request = await fetch(`https://api.giphy.com/v1/gifs/search?q=${name}&limit=10&api_key=${apiKey}`);

    const { data } = await request.json();
    const ListGif = data.map(img => {
        return{
            id: img.id,
            title: img.title,
            url: img.images.original.url
    
        }
    })
    return ListGif;
}