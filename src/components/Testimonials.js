import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Container } from 'react-bootstrap';
const state = {
    responsive: {
        0: {
            items: 1,
        },
        450: {
            items: 1,
        },
        600: {
            items: 1,
        },
        1000: {
            items: 1,
        },
    },
}
const Testimonials = () => {
    return (
        <>
            <Container fluid className='testimonialss'>
                <h1 class="how-it-work">What People Says</h1>
                <Container>
                    <OwlCarousel className='owl-theme' margin={20} autoplay Nav={false} dots={true} items={3} touchDrag={true} lazyLoad={true}
                        responsive={state.responsive}>
                        <div class='item'>
                            <p>It was the last day to arrange for my kid's school fees. Due to a delay in my salary, I had no savings left for that month. I knew that things would turn out fine, but how, was the question and the task. I got to know about the Quick Cash platform from my neighbor. I got instant cash in return for my branded watch. The process was accessible, and I appreciated the concept of lending money in return for my valuable item as I didn’t want to take the loan.</p>
                        </div>
                        <div class='item'>
                            <p>Recently I sold an antique piece and I was surprised to see the cash payment done instantly with minimal digital documentation, as I thought the maximum days of transferring would take 3 at the most. The staff is friendly and professional. The process is very easy and during instant cash requirements, it is the most chosen method</p>
                        </div>
                        <div class='item'>
                            <p>A medical emergency can arise anytime and the expenses are one thing we can never be sure of, this emergency is what I experienced last week that cost me a lot of money. I was starting to have difficulty managing my daily expenses. When I came to know about Quick cash, they provided cash in return for valuable items/products. I traded my laptop and the best part is I was able to buy my laptop back within a limited period of time.</p>
                        </div>
                    </OwlCarousel>
                </Container>
            </Container>
        </>
    );
}

export default Testimonials;