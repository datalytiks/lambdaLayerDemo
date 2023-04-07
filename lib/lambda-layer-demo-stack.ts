import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';


export class LambdaLayerDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Lambda Layer - package-layer
    const packageLayer = new lambda.LayerVersion(this, 'package-layer', {
      compatibleRuntimes: [ lambda.Runtime.NODEJS_16_X ],
      compatibleArchitectures: [ lambda.Architecture.X86_64 ],
      code: lambda.Code.fromAsset('src/layers/npm-packages'),
      description: 'npm package layer having yup'
    })

    // Create Lambda Layer - package-layer
    const functionLayer = new lambda.LayerVersion(this, 'function-layer', {
      compatibleRuntimes: [ lambda.Runtime.NODEJS_16_X ],
      compatibleArchitectures: [ lambda.Architecture.X86_64 ],
      code: lambda.Code.fromAsset('src/layers/helper-functions'),
      description: 'function layer having calc module'
    })

    // Create Lambda - Lambda for demo layer
    const lambdaForLayerDemo = new lambda.Function(this, 'lambdaForLayerDemo', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('src/lambdas/lambda-one'),
      handler: 'demoLayerLambda.main',
      layers: [packageLayer, functionLayer]
    })

    // Create API gateway
    new apigw.LambdaRestApi(this, 'LayerDemo', {
      handler: lambdaForLayerDemo,
    })



  }
}
