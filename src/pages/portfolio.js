import React from 'react'
import Layout from '../components/Layout';
import Project from "../components/project"
import Seo from "../components/seo"
// import { useWidth } from '../hooks/useWidth';

import {wrapper,article} from "./portfolio.module.css"

const data = [{
		title: 'Book lover site',
		link: 'https://basicbooksitemain.gatsbyjs.io/',
		img: './images/booksmini.jpg',
		id: '2a',
		description: 'A site about books and summaries, complete with resposivity',
	},
	{
		title: 'Simple solana calculator',
		link: 'https://basic-solana-calculator.herokuapp.com/',
		img: './images/calculatormini.jpg',
		id: '2a',
		description:
			'A full stack calculator app on the blockchain. Using React, material ui on the frontend and solana, anchor backend',
	},
	{
		title: 'Blog Site sample',
		link: 'https://professorcodegeekblogsitesample1.netlify.app/',
		img: './images/smallA.jpeg',
		id: '1a',
		description: 'The first iteration of this site using react and mui',
	},
	{
		title: 'Norton Gym',
		link: 'https://nortongymv1.netlify.app/',
		img: './images/smallH.jpg',
		id: '2a',
		description:
			'A fully Responsive gym landing page design for a hypothetical Gym in my home town.',
	},	
];

export default function Portfolio() {
  
// let mobile = useWidth(true) ; //hook used to toggle screen components based on width

  return (
		<Layout>
			{/* <div style={styles.bg}></div> */}
			<main class={wrapper}>
				{
					data.map(({title,link,description,img,id})=>(
					<article key={id} class={article}>
						<Project title={title} link={link} img={img} description={description}/>
				  </article>
					))
				}			
			</main>
		</Layout>
	);
}

export const Head = () => <Seo title='Portfolio' />;



