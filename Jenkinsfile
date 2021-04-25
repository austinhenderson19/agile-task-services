pipeline {
  agent {
    docker {
      image 'node:alpine'
      args: '-p 4000:4000'
    }
  }
  stages { 
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
  }
}