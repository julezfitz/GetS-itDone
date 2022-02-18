import React from "react";
import { motion } from "framer-motion";

function TransitionWrapper({ children, location }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{duration: 0.5}}
			style={{height: "100%"}}
		>{children}</motion.div>
	);
}

export default TransitionWrapper;
