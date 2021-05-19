import React,{useState,useEffect} from 'react'
import Navbar from '../layouts/Navbar'
import Checkbox from './Checkbox'
import Card from './Card'
import RadioBox from './RadioBox'
import { prices } from './fixedPrice'
import { getFilteredProducts, getCategories } from './uiApi'

const Shop = () => {

    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });

    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    const [filteredResults, setFilteredResults] = useState([]);
    const [size, setSize] = useState(0);


    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
    }
    useEffect(() => {
        init()
        loadFilteredResults(skip, limit, myFilters.filters)

    }, []);
    const handleFilters = (filters, filterBy) => {
        //console.log("PRODUCTS",filters,filterBy);
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters

        if (filterBy === "product_price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues
        }
        loadFilteredResults(myFilters.filters)

        setMyFilters(newFilters)


    }
    const handlePrice = value => {
        const data = prices
        let array = [];
        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    }

    const loadFilteredResults = (newFilters) => {
        getFilteredProducts(skip, limit, newFilters)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setFilteredResults(data.data);
                    setSize(data.size);
                    setSkip(0);

                }
            })
    }

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size >= 0 &&
            size >= limit && (
                <center> <button onClick={loadMore} className="btn btn-warning m-5" style={{ margin: '10px', padding: '10px', width: '150px', fontSize: '20px' }}>
                    Load more
            </button>
                </center>
            )
        );
    };

    return (
        <div>
            <Navbar />

            <div className="ads-grid py-sm-5 py-4">
                <div className="container py-xl-4 py-lg-2">


                    <div className="row">
                        <div className="col-lg-3 mt-lg-0 mt-4 p-lg-0">
                            <div className="range border-bottom py-2">
                                <h3 className="agileits-sear-head mb-3">Filter By Category</h3>
                                <div className="w3l-range">
                                    <ul>
                                        <Checkbox categories={categories}
                                            handleFilters={filters => handleFilters(filters, 'category_name')}
                                        />
                                    </ul>

                                </div>
                            </div>


                            <div className="range border-bottom py-2">
                                <h3 className="agileits-sear-head mb-3">Price Range</h3>
                                <div className="w3l-range">
                                    <ul>
                                        <RadioBox prices={prices}
                                            handleFilters={filters => handleFilters(filters, 'product_price')}
                                        />
                                    </ul>

                                </div>
                            </div>
                        </div>

                        <div className="agileinfo-ads-display col-lg-9">
                            <div clasName="wrapper">

                                <div className="product-sec1 px-sm-4 px-3 py-sm-5  py-3 mb-4">
                                    <div className="row">
                                        {filteredResults.map((product, i) => (
                                            <Card key={i} product={product} />
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Shop
