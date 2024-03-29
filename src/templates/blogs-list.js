import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { CardActionArea, Link } from 'gatsby-theme-material-ui';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import { useWidth } from '../hooks/useWidth';
import Seo from "../components/seo";

import {link, linkDiv} from './blogs.module.css';

export default function Blogs({ data, pageContext }) {
	const previousPage =
		pageContext.currentPage === 2
			? '/blog'
			: `/blog/${pageContext.currentPage - 1}`;
	const nextPage = `/blog/${pageContext.currentPage + 1}`;
	const blogs = data.allMarkdownRemark.edges;

	// let mobile = useWidth(true); //hook used to toggle screen components based on width

	const styles = {
		wrapper: {
			marginTop: '10vh',
			height: 'auto',
			overflow: 'hidden',
			width: '100%',

			box: {
				marginBottom: '5vh',
				height: '300px',

				card: {
					width: '80vw',
					margin: ' 0 auto 5vh auto',
					height: '300px',
					actionArea: {
						width: '100%',
					},
				},
			},
		},
	};
	return (
		<Layout>
			<div style={styles.wrapper}>
				<ul sx={styles.wrapper.box}>
					{blogs.map((blog) => {
						const image = getImage(blog.node.frontmatter.snipImage);
						return (
							<Card sx={styles.wrapper.box.card} key={blog.node.id}>
								<CardActionArea
									sx={styles.wrapper.box.card.actionArea}
									to={blog.node.fields.slug}
								>
									<GatsbyImage
										sx={styles.wrapper.box.card.actionArea.img}
										image={image}
										height={100}
										alt='blog image'
									/>
									<CardContent>
										<Typography gutterBottom variant='h4' component='div'>
											{blog.node.frontmatter.title}
										</Typography>
										<Typography gutterBottom variant='h5' component='div'>
											{blog.node.frontmatter.date}
										</Typography>
										<Typography variant='body2' color='text.secondary'>
											{blog.node.excerpt}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						);
					})}
				</ul>

				<div class={linkDiv}>
					{pageContext.currentPage > 1 && (
						<Link to={previousPage} class={link}>							
							{'Go to previous page'}
						</Link>
					)}

					{pageContext.currentPage < pageContext.pageCount && (
						<Link to={nextPage} class={link}>
							 Go to next page
						</Link>
					)}
				</div>
			</div>
		</Layout>
	);
}

export const query = graphql`
	query BlogListQuery($skip: Int!, $limit: Int!) {
		allMarkdownRemark(
			sort: { fields: [frontmatter___date], order: DESC }
			filter: { frontmatter: { contentKey: { eq: "blog" } } }
			limit: $limit
			skip: $skip
		) {
			edges {
				node {
					id
					frontmatter {
						title
						date(formatString: "MMMM D, YYYY")
						snipImage {
							childImageSharp {
								gatsbyImageData(placeholder: TRACED_SVG)
							}
						}
					}
					fields {
						slug
					}
					excerpt
				}
			}
		}
	}
`;

export const Head = () => <Seo title='Blogs' />;
