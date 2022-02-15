import React from "react";
import { AnimatePresence, motion } from "framer-motion";

function TransitionWrapper({ children, location }) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			style={{ minHeight: "100vh" }}
		>
			{children}
		</motion.div>
	);
}

export default TransitionWrapper;
