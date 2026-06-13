# A/B Testing Simulator for E-commerce

A simple web-based simulator to help e-commerce teams plan, size, and review A/B tests before making product, pricing, checkout, or marketing changes.

## Live Demo

Access the simulator here:
**[Add your hosted link here]**

## What this tool helps you do

This simulator helps you answer practical A/B testing questions such as:

* How many users do I need in each test group?
* How long should the experiment run?
* Which success metric should I track?
* Which guardrail metrics should I monitor?
* Are the observed results directionally meaningful?
* Is the uplift large enough to support a business decision?

## Who this is useful for

This tool is designed for:

* Product managers testing website or app changes
* Growth teams running conversion experiments
* E-commerce teams testing checkout, pricing, or merchandising changes
* Founders and operators who want a quick experiment-planning tool
* Students or analysts learning how A/B testing works in a business context

## Metrics supported

You can plan and review experiments for common e-commerce metrics, including:

* Conversion rate
* Add-to-cart rate
* Checkout completion rate
* Revenue per visitor
* Average order value
* Repeat purchase rate

## How to use the simulator

### 1. Select your primary metric

Choose the main metric your experiment is expected to improve. For example, if you are testing a new checkout flow, your primary metric may be checkout completion rate or conversion rate.

### 2. Review guardrail metrics

The simulator recommends supporting metrics that should be monitored alongside the primary metric. These help ensure that an improvement in one area does not negatively affect another part of the customer journey.

For example, a discount experiment may improve conversion rate but reduce average order value or revenue per visitor.

### 3. Estimate sample size

Enter your baseline performance and expected uplift. The simulator estimates the number of users required to run a more reliable experiment.

This helps avoid ending a test too early or making a decision based on insufficient data.

### 4. Estimate test duration

Add your expected daily traffic to understand how many days the experiment may need to run.

This is useful for planning experiments before launch and setting realistic stakeholder expectations.

### 5. Review observed results

Once you have test data, enter the control and treatment results. The simulator provides a significance-style calculation to help you understand whether the observed difference is likely to be meaningful.

## Example use cases

### Testing a new product page

You can use the simulator to estimate whether a redesigned product page improves add-to-cart rate without hurting conversion rate or revenue per visitor.

### Testing a checkout flow change

You can evaluate whether a simplified checkout journey improves checkout completion rate and estimate how much traffic is needed before reading results.

### Testing a pricing or discount experiment

You can check whether a promotional offer improves conversion while monitoring guardrails such as average order value and revenue per visitor.

### Testing retention-focused changes

You can use repeat purchase rate as the primary metric when evaluating loyalty, post-purchase, or reactivation experiments.

## Important notes

This simulator is intended for planning, learning, and directional analysis. It should not be treated as a replacement for a full experimentation platform or advanced statistical review.

For high-stakes business decisions, results should be validated with proper experiment design, clean data collection, and sufficient test duration.

## Privacy

This is a front-end-only static web app. It does not require login and does not store user-entered data on a server.

## Tech stack

This project is built using:

* HTML
* CSS
* JavaScript

No external libraries or frameworks are required.

## Future improvements

Potential upgrades include:

* Visual charts for sample size and test duration
* Exportable experiment summaries
* Saved test scenarios
* One-sided and two-sided test options
* Multiple variant support
* Confidence interval display
* Stakeholder-ready experiment report generation

